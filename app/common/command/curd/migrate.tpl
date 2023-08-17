use think\migration\Migrator;
use think\migration\db\Column;

class {$class_name} extends Migrator
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('{$table}')
            ->setComment('{$table_info.TABLE_COMMENT}')
            {volist name="table_columns" id="column"}->addColumn('{$column.field}', '{$column.type}', [{volist name="column.options" id="option"}'{$key}' => {$option|raw}, {/volist}])
            {/volist}
            {volist name="table_keys_uni" id="vo"}->addIndex('{$vo}',['unique'=>true])
            {/volist}
            {volist name="table_keys_text" id="vo"}->addIndex('{$vo}',['type'=>'fulltext'])
            {/volist}
            {volist name="table_keys" id="vo"}->addIndex('{$vo}')
            {/volist}->create();
    }
}
