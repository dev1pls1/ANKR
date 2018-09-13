<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Expires: " . date("r"));

$index = file_get_contents('./home.html');
$index = preg_replace('/(href=".+\.css)"/', '$1' . '?x=' . time() . '"', $index);

echo preg_replace('/(src=".+\.js)"/', '$1' . '?x=' . time() . '"', $index);