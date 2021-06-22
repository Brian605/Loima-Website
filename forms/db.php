<?php

$server='localhost';
$user='themarke_Returno';
$password='Brian605ret0';
$database='themarke_data';

//connect
$con=new mysqli($server,$user,$password );
if (!$con){
    die("Cannot conect to server ".$con->error);
}

//create database
if (!$con->query("CREATE DATABASE IF NOT EXISTS ".$database)){
    die("Could not create table ".$con->error);
}

//select database
if (!$con->select_db($database)){
    die("Cannot select database ".$con->error);
}

//create users table
$sql="CREATE TABLE IF NOT EXISTS LoimaUsers(Id INT(14) NOT NULL AUTO_INCREMENT PRIMARY KEY,stud_name VARCHAR (30) NOT NULL, email VARCHAR(60) NOT NULL, regno VARCHAR(17) NOT NULL, phone VARCHAR(10) NOT NULL,stud_year VARCHAR(3) NOT NULL,institution TEXT NOT NULL, ward TEXT NOT NULL, pass VARCHAR (64) NOT NULL,status VARCHAR (100) NOT NULL, role VARCHAR (20) NOT NULL )";
if (!$con->query($sql)){
    die($con->error);
}

//create files table
$sql="CREATE TABLE IF NOT EXISTS files(name TEXT NOT NULL, downloadUrl TEXT NOT NULL )";
if (!$con->query($sql)){
    die($con->error);
}

//create blogs table
$sql="CREATE TABLE IF NOT EXISTS blog(Id INT(14) NOT NULL AUTO_INCREMENT PRIMARY KEY, title TEXT NOT NULL,description LONGTEXT NOT NULL, downloadUrl TEXT NOT NULL )";
if (!$con->query($sql)){
    die($con->error);
}

//create bursary table
$sql="CREATE TABLE IF NOT EXISTS bursary(Id INT(14) NOT NULL AUTO_INCREMENT PRIMARY KEY,name TEXT NOT NULL, regno TEXT NOT NULL, phone TEXT NOT NULL ,ward TEXT NOT NULL, institution TEXT NOT NULL, year TEXT NOT NULL, docs TEXT NOT NULL, app_date TEXT NOT NULL,status TEXT NOT NULL)";
if (!$con->query($sql)){
    die($con->error);
}

//create status table
$sql="CREATE TABLE IF NOT EXISTS bursary_status(status TEXT NOT NULL)";
if (!$con->query($sql)){
    die($con->error);
}

//create profile table
$sql="CREATE TABLE IF NOT EXISTS profile(Id INT(14) NOT NULL AUTO_INCREMENT PRIMARY KEY,regno TEXT NOT NULL,url TEXT NOT NULL)";
if (!$con->query($sql)){
    die($con->error);
}

//create gallery table
$sql="CREATE TABLE IF NOT EXISTS gallery(Id INT(14) NOT NULL AUTO_INCREMENT PRIMARY KEY, downloadUrl TEXT NOT NULL)";
if (!$con->query($sql)){
    die($con->error);
}
