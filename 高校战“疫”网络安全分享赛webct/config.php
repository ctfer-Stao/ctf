<?php
error_reporting(0);
class Db
{
    public $ip;
    public $user;
    public $password;
    public $option;
    function __construct($ip,$user,$password,$option)
    {
        $this->user=$user;
        $this->ip=$ip;
        $this->password=$password;
        $this->option=$option;
    }
    function testquery()
    {
        $m = new mysqli($this->ip,$this->user,$this->password);
        if($m->connect_error){
            die($m->connect_error);
        }
        $m->options($this->option,1);
        $result=$m->query('select 1;');
        if($result->num_rows>0)
        {
            echo '测试完毕，数据库服务器处于开启状态';
        }
        else{
            echo '测试完毕,数据库服务器未开启';
        }
    }
}

class File
{
    public $uploadfile;
    function __construct($filename)
    {
        $this->uploadfile=$filename;
    }
    function xs()
    {
        echo '请求结束';
    }
}

class Fileupload
{
    public $file;
    function __construct($file)
    {
        $this->file = $file;
    }
    function deal()
    {
        $extensionarr=array("gif","jpeg","jpg","png");
        $extension = pathinfo($this->file->uploadfile['name'], PATHINFO_EXTENSION);
        $type = $this->file->uploadfile['type'];
        //echo "type: ".$type;
        $filetypearr=array("image/jpeg","image/png","image/gif");
        if(in_array($extension,$extensionarr)&in_array($type,$filetypearr)&$this->file->uploadfile["size"]<204800)
        {
            if ($_FILES["file"]["error"] > 0) {
                echo "错误：: " .$this->file->uploadfile["error"] . "<br>";
                die();
            }else{
                if(!is_dir("./uploads/".md5($_SERVER['REMOTE_ADDR'])."/")){
                    mkdir("./uploads/".md5($_SERVER['REMOTE_ADDR'])."/");
                }
                $upload_dir="./uploads/".md5($_SERVER['REMOTE_ADDR'])."/";
                move_uploaded_file($this->file->uploadfile["tmp_name"],$upload_dir.md5($this->file->uploadfile['name']).".".$extension);
                echo "上传成功"."<br>";
            }
        }
        else{
            echo "不被允许的文件类型"."<br>";
        }
    }
    function __destruct()
    {
        $this->file->xs();
    }
}
class Listfile
{
    public $file;
    function __construct($file)
    {
        $this->file=$file;
    }
    function listdir(){
        system("ls ".$this->file)."<br>";
    }
    function __call($name, $arguments)
    {
        system("ls ".$this->file);
    }
}
