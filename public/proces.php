
<?php

if(isset($_POST['confession']))
{
$data=$_POST['confession'];

$fp = fopen('data.txt', 'a');
fwrite($fp, $data);
fclose($fp);
}
?>