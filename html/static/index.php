<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
<link rel="stylesheet" type="text/css" href="/plain.css">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

</head>

<div class="page">

<?php
	include_once "markdown.php";
	$note = $_GET['note'];

	$contents = file_get_contents($note . '.txt');
	echo Markdown($contents);		
?>


<div class="footer">
	<a href="/content/blog">more blog entries</a>
</div>

</div>
