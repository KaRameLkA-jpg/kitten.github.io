<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

/// Добавление данных в таблицу
$tg_name = "@example_name";

// Подготовка и выполнение запроса
$sql = "INSERT INTO Person_Data (TG_Name) VALUES ('$tg_name')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

/// Пример вставки данных и вывод
$first_name = "Anastasia";
$last_name = "Kirsanova";
$tg_name = "@anastasia";
$kitten_count = 100.5;
$link = "https://example.com";

// Вставка данных в ID_Person
$sql_person = "INSERT INTO ID_Person (First_Name, Last_Name, TG_Name) 
VALUES ('$first_name', '$last_name', '$tg_name')";

if ($conn->query($sql_person) === TRUE) {
    echo "New person record created successfully";
} else {
    echo "Error: " . $sql_person . "<br>" . $conn->error;
}

// Вставка данных в ID_Kitten_Tap
$sql_kitten = "INSERT INTO ID_Kitten_Tap (Kitten_Count, Link, TG_Name) 
VALUES ('$kitten_count', '$link', '$tg_name')";

if ($conn->query($sql_kitten) === TRUE) {
    echo "New Kitten Tap record created successfully";
} else {
    echo "Error: " . $sql_kitten . "<br>" . $conn->error;
}

$conn->close();

///Отображение данных
$sql = "SELECT * FROM ID_Person WHERE TG_Name='@anastasia'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // вывод данных каждой строки
    while($row = $result->fetch_assoc()) {
        echo "Name: " . $row["First_Name"]. " " . $row["Last_Name"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
