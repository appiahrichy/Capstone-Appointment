<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-do List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
        }
        .header {
            background: #007bff;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 18px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
        }
        .navbar {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 5px;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
        .sidebar {
            width: 200px;
            position: fixed;
            top: 50px;
            left: 0;
            padding: 15px;
        }
        .sidebar a {
            display: block;
            padding: 10px;
            text-decoration: none;
            color: black;
        }
        .content {
            margin-left: 220px;
            margin-top: 60px;
            padding: 20px;
        }
        .card {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        .status {
            float: right;
            padding: 5px;
            border-radius: 5px;
        }
        .options-menu {
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
            display: none;
            width: 150px;
        }
        .options-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .options-menu ul li {
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        }
        .options-menu ul li:last-child {
            border-bottom: none;
        }
        .options-menu ul li:hover {
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>Welcome To Your To-do</div>
        <div class="navbar">
            <a href="#">Dashboard</a>
            <a href="#">To-do</a>
            <a href="#">Inbox</a>
            <a href="#">Settings</a>
        </div>
    </div>
    <div class="sidebar">
        <a href="#" onclick="filterTasks('all')">All</a>
        <a href="#" onclick="filterTasks('pending')">Pending</a>
        <a href="#" onclick="filterTasks('canceled')">Canceled</a>
        <a href="#" onclick="filterTasks('completed')">Completed</a>
    </div>
    <div class="content">
        <div class="card" data-status="pending">
            <b>Counseling Department</b>
            <span class="status pending">Pending</span>
            <p>30 Minute Meeting - Thursday, 9:00am - 9:30am</p>
            <button onclick="toggleMenu(event)">⚙️</button>
            <div class="options-menu">
                <ul>
                    <li>Edit</li>
                    <li>Add Internal Note</li>
                    <li>Reminder</li>
                    <li>Cancel</li>
                </ul>
            </div>
        </div>
        <div class="card" data-status="canceled">
            <b>Hospital Department</b>
            <span class="status canceled">Canceled</span>
            <p>30 Minute Meeting - Thursday, 9:00am - 9:30am</p>
            <button onclick="toggleMenu(event)">⚙️</button>
            <div class="options-menu">
                <ul>
                    <li>Edit</li>
                    <li>Add Internal Note</li>
                    <li>Reminder</li>
                    <li>Cancel</li>
                </ul>
            </div>
        </div>
        <div class="card" data-status="completed">
            <b>Academic Department</b>
            <span class="status completed">Completed</span>
            <p>30 Minute Meeting - Thursday, 9:00am - 9:30am</p>
            <button onclick="toggleMenu(event)">⚙️</button>
            <div class="options-menu">
                <ul>
                    <li>Edit</li>
                    <li>Add Internal Note</li>
                    <li>Reminder</li>
                    <li>Cancel</li>
                </ul>
            </div>
        </div>
    </div>
    <script>
        function filterTasks(status) {
            let cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                if (status === 'all' || card.getAttribute("data-status") === status) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }
        
        function toggleMenu(event) {
            event.stopPropagation();
            let menu = event.target.nextElementSibling;
            document.querySelectorAll(".options-menu").forEach(m => {
                if (m !== menu) m.style.display = "none";
            });
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        document.addEventListener("click", () => {
            document.querySelectorAll(".options-menu").forEach(menu => menu.style.display = "none");
        });
    </script>
</body>
</html>
