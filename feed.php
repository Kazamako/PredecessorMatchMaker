<?php
header("Content-type: application/x-javascript");
//RSSフィードのURL
$rss_url = "ここにRSSフィードのURL.rdf";
// 一覧に表示する記事タイトル件数
$num_data = 5;
 
$out_data = "";
 
$rss = simplexml_load_file($rss_url);
$array_rss = array();
 
foreach ($rss->item as $item) {
	$dc = $item->children('http://purl.org/dc/elements/1.1/');
	$array_rss[] = array('title'=>$item -> title, 'url' => $item -> link, 'date'=> date('Y年m月d日', strtotime($dc->date)));
}
 
if( count($array_rss) < $num_data ){
	$num_data = count($array_rss);
}
 
for ($i=0; $i<$num_data; $i++){
	$title = $array_rss[$i]['title'];
	$date =  $array_rss[$i]['date'];
	$url = $array_rss[$i]['url'];
 
	$tag_date = "<dt>".$date."</dd>";
	$tag_title = "<dd><a href=\"".$url."\" target=_blank>".$title."</a></dd>";
	$out_data.= $tag_date.$tag_title;
 
}
echo "document.write('<dl>');";
echo "document.write('$out_data');";
echo "document.write('</dl>');";
?>