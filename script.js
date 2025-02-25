body {
    font-family: Arial, sans-serif;
    background-color: darkgreen;
    color: goldenrod;
    margin: 0;
    padding: 0;
    direction: rtl;
}

.page {
    display: none;
    padding: 20px;
}

#loginPage, #registerPage {
    text-align: center;
    margin-top: 100px;
}

input, textarea, button {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 80%;
    max-width: 400px;
    border: 1px solid goldenrod;
    background-color: #333;
    color: goldenrod;
}

button {
    background-color: goldenrod;
    color: darkgreen;
    border: none;
    cursor: pointer;
}

.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidebar-content {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: goldenrod;
    display: block;
    transition: 0.3s;
}

.sidebar-toggle {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    margin-left: 50px;
    background: none;
    border: none;
    color: goldenrod;
    cursor: pointer;
}

.main-content {
    margin-right: 0;
    padding: 16px;
    transition: margin-right .5s;
}
