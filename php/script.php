<?php
const USERNAME = 'testuser';
const PASSWORD = 'testpass';


if (!empty($_POST)) {
    // this is post request, let's check values

    $username = null;
    $password = null;

    if (isset($_POST['userUsername'])) {
        $username = (string)$_POST['userUsername'];
    }

    if (isset($_POST['userPassword'])) {
        $password = (string)$_POST['userPassword'];
    }

    $errors = [];

    if ($username != USERNAME || $password != PASSWORD ) {
        $errors['general'] = 'Wrong credentials';
    }

    if (empty($username)) {
        $errors ['userUsername'] = 'You have to enter username';
    }

    if (empty($password)) {
        $errors ['userPassword'] = 'You have to enter password';
    }

    if (!empty($errors)) {
        // there are errors, return 400 with json with errors
        http_response_code(400);
    } else {
        // there are no errors, return 200
        http_response_code(200);
    }
    header('Content-Type: application/json');
    echo json_encode($errors);
    exit();
}
?>
<form>
    Username: <input type="text" name="userUsername"/><br />
    Password: <input type="text" name="userPassword"/><br />
    <input type="submit" />
</form>