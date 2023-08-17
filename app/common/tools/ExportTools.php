<?php

namespace app\common\tools;

use PhpOffice\PhpSpreadsheet\Cell\DataType;

class ExportTools
{
    public static function excel($model, $where = [], $fields = [], $image_fields = [], $select_fields = [], $date_fields = [])
    {

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $write_col = 1;
        $write_line = 1;
        foreach ($fields as $field_key => $field_name) {
            $col_key = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($write_col);
            $sheet->setCellValue($col_key . $write_line, $field_name);
            $sheet->getColumnDimension($col_key)->setWidth(mb_strlen($field_name) * 3);

            $write_col++;
        }

        $runtime_file_list = [];

        $limit = 1000;

        $page = 0;

        while (true) {
            $page++;
            $list = $model
                ->where($where)->page($page, $limit)->select();
            foreach ($list as $list_index => $item) {
                $write_line++;
                $write_col = 1;

                foreach ($fields as $field_key => $field_name) {
                    $col_key = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($write_col);

                    $cel =  null;

                    $value  = \think\helper\Arr::get($item, $field_key);

                    if (in_array($field_key, $image_fields)) {
                        // 是图片
                        $cel = $value;

                        try {

                            if (filter_var($value, FILTER_VALIDATE_URL)) {

                                $runtime_file = PathTools::tempBuildPath(uniqid());

                                $runtime_file_list[] = $runtime_file;

                                file_put_contents($runtime_file, file_get_contents($value));

                                $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                $drawing->setName($field_name);
                                $drawing->setDescription($field_key);
                                $drawing->setPath($runtime_file);
                                $drawing->setHeight(36);

                                $drawing->setCoordinates($col_key . $write_line);
                                $drawing->setWorksheet($sheet);
                            }
                        } catch (\Throwable $th) {
                            $message = $th->getMessage();

                            $cel .= "\n" . $message;
                        }
                    } else if (array_key_exists($field_key, $select_fields)) {
                        // 需要设置选项

                        $cel = $select_fields[$field_key][$value] ?? $value;
                    } else if (in_array($field_key, $date_fields)) {
                        if (empty($value)) {
                            $cel = '';
                        } else {
                            $cel = date('Y-m-d H:i:s', $value);
                        }
                    } else {
                        $cel  = $value;
                    }

                    $sheet->setCellValueExplicit($col_key . $write_line, $cel, DataType::TYPE_STRING);
                    $write_col++;
                }
            }

            if (count($list) < $limit) {
                break;
            }
        }


        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);

        ob_start();
        $writer->save('php://output');
        $content = ob_get_contents();
        ob_clean();

        foreach ($runtime_file_list as  $runtime_file) {
            if (file_exists($runtime_file)) {
                unlink($runtime_file);
            }
        }

        return $content;
    }
}
