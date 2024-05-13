function updateNavbar(element) {
    // Clear previous content, if necessary
    clearContent();

    // Remove 'active' class from all links
    document.querySelectorAll('div.topnav a').forEach(link => {
        link.classList.remove('active');
    });

    // Select all group content and hide it by default
    const groupContent = document.querySelectorAll('[group]');
    groupContent.forEach(content => {
        content.style.display = 'none';
    });

    // Conditionally display content based on the clicked element
    if (element.id === "all") {
        // Display all groups if 'all' is selected
        groupContent.forEach(content => {
            content.style.display = '';
            element.classList.add('active');
        });
    } else {
        // Display only the selected group
        document.querySelectorAll(`[group="${element.id}"]`).forEach(content => {
            content.style.display = '';
        });
        element.classList.add('active');
    }
}

function clearContent(){
    // Delete old content containing old recap
    try {
        const links = document.querySelectorAll('div.mapContainer div.point');
        links.forEach(link => {
            link.classList.remove('active');
        });
        document.getElementsByClassName('content')[0].remove();
    } catch(error) {
        //pass
    }
}

function updateStory(element){
    const container = document.querySelector('.mapContainer');
    const links = document.querySelectorAll('div.mapContainer div.point');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Delete old content containing old recap
    clearContent()

    //Check for nav button use
    if (typeof element === "number") {
        element = document.querySelectorAll(`[session="${element}"]`)[0];
    }

    //Get group number
    const group = element.getAttribute("group")
    const capitalized = group.charAt(0).toUpperCase() + group.slice(1)

    // Make new content containing new recap
    let session = Number(element.getAttribute('session'));
    const content = document.createElement('div');
    content.setAttribute('style', element.getAttribute('style'));
    content.setAttribute('width', '500');
    content.classList.add('content');

    // Heading
    const title = document.createElement('h1')
    title.textContent = `Session ${session + 1}`
    title.classList.add('title')
    content.appendChild(title)

    // Image Content
    const illustration = document.createElement('img');
    illustration.src = `..\\images\\group${capitalized}\\Session ${session}.webp`;
    illustration.alt = 'illustration';
    illustration.width = '500';
    illustration.height = '300';
    content.appendChild(illustration);

    // Text Content
    const frame = document.createElement('iframe');
    frame.classList.add('recap');
    frame.src = `..\\content\\group${capitalized}Recap\\Session ${session}.txt`;
    frame.width = '500';
    frame.height = '500';
    content.appendChild(frame);

    // Navigation buttons
    if (session > 0) {
        const backward = document.createElement('button');
        backward.textContent = "<----";
        backward.setAttribute('onclick', `updateStory(${session - 1})`);
        backward.width = '250';
        content.appendChild(backward);
    }
    if (session < 15) {
        const forward = document.createElement('button');
        forward.textContent = "---->";
        forward.setAttribute('onclick', `updateStory(${session + 1})`);
        forward.width = '250';
        content.appendChild(forward);
    }

    container.appendChild(content);

    element.classList.add('active');
    content.scrollIntoView({inline: "center"});
}

const groupThreePoints = [
    { x: 636, y: 700 },
    { x: 630, y: 660 },
    { x: 636, y: 719 },
    { x: 550, y: 700},
    { x: 435, y: 709},
    { x: 335, y: 690},
    { x: 345, y: 700},
    { x: 335, y: 710},
    { x: 365, y: 710},
    { x: 325, y: 700},
    { x: 345, y: 730},
    { x: 355, y: 750},
    { x: 340, y: 750},
    { x: 340, y: 740},
    { x: 330, y: 740},
    { x: 325, y: 715}
];

function addPoints(group, points) {
    const container = document.querySelector('.mapContainer');
    let session = 0;
    points.forEach(point => {
        // Draws lines between list of points
        if (session !== 0) {
            const canvas = document.getElementsByClassName("canvas")[0];
            const cursor = canvas.getContext("2d");

            cursor.lineWidth = 2;
            cursor.strokeStyle = "orange";
            cursor.beginPath();
            cursor.moveTo(point.x-8, point.y-56);
            cursor.lineTo(prevPoint.x-8, prevPoint.y-56);
            cursor.closePath();
            cursor.stroke();
        }
        // Plots points onto the map to be clickable
        const p = document.createElement('div');
        p.classList.add('point');
        p.style.left = `${point.x}px`;
        p.style.top = `${point.y}px`;
        p.setAttribute('onclick', 'updateStory(this)');
        p.setAttribute('session', session);
        p.setAttribute('group', group);
        container.appendChild(p);
        session += 1;
        prevPoint = point;
    });
}

window.onload = addPoints('three', groupThreePoints);