<!DOCTYPE html>
<html>
<head>
<title>yaxamie - gamerdads</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
<link rel="stylesheet" type="text/css" href="/plain.css">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

</head>

<body>
<div class='page'>

<h1 id="header-text"><i>the game dads</i></h1>
<p>Email - emailthedads@gmail.com
<p>Twitter - <a href="https://twitter.com/game_dads">@game_dads</a>

<?php
$xml=simplexml_load_file("Poderator.xml") or die("Error: Cannot create object");
$items = $xml->channel->item;

for ($i = count($items) - 1; $i >= 0; $i--)
{
   $item = $items[$i];

	echo "<hr>";
	echo "<h2>" . $item->title . "</h2>";
	echo "<p>" . $item->description;
	echo "<p><a href ='" . $item->link  . "'>[listen]</a><br>";
   
}
?>


<div class="footer"><a href="/">home</a></div>

</div>

</body>

</html>
