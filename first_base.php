<?php
$link = mysqli_connect("https://karamelka-jpg.github.io/kitten.github.io/", "root", "12345678", "kittentap");

if ($link == false){
    print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
}
else {
    print("Соединение установлено успешно");
}
?>
