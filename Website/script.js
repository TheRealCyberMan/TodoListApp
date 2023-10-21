document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('month-display');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const addEventBtn = document.getElementById('add-event');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = null;
    const events = {}; 

    function createCalendar(year, month) {
        calendar.innerHTML = '';
        monthDisplay.textContent = months[month] + ' ' + year;

        const currentDate = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = currentDate.getDay();

        const days = [];

        for (let i = 0; i < firstDayIndex; i++) {
            days.push('');
        }

        for (let i = 1; i <= lastDay; i++) {
            days.push(i);
        }

        const dayElements = days.map(day => {
            const cell = document.createElement('div');
            cell.classList.add('calendar-day');
            cell.dataset.date = day; 
            if (day === '') {
                cell.innerHTML = '';
            } else {
                cell.innerHTML = day;
                cell.addEventListener('click', function() {
                    clearSelection();
                    this.classList.add('selected');
                    selectedDate = new Date(year, month, day);

                    
                    displayEventsForDate(year, month, day);
                });
            }
            return cell;
        });

        dayElements.forEach(cell => {
            calendar.appendChild(cell);
        });
    }

    function clearSelection() {
        const selectedCells = document.querySelectorAll('.selected');
        selectedCells.forEach(cell => {
            cell.classList.remove('selected');
        });
    }

    function displayEventsForDate(year, month, day) {
        const dateKey = `${year}-${month + 1}-${day}`;
        const eventList = events[dateKey];
        if (eventList && eventList.length > 0) {
            
            const eventLists = document.querySelectorAll('.event-list');
            eventLists.forEach(list => {
                list.remove();
            });

            const selectedCell = document.querySelector('.selected');
            const ul = document.createElement('ul');
            ul.classList.add('event-list');
            eventList.forEach(event => {
                const li = document.createElement('li');
                li.textContent = event;
                ul.appendChild(li);
            });
            selectedCell.appendChild(ul);
        }
    }

    createCalendar(currentYear, currentMonth);

    prevMonthBtn.addEventListener('click', function() {
        if (currentMonth > 0) {
            currentMonth--;
        } else {
            currentMonth = 11;
            currentYear--;
        }
        createCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', function() {
        if (currentMonth < 11) {
            currentMonth++;
        } else {
            currentMonth = 0;
            currentYear++;
        }
        createCalendar(currentYear, currentMonth);
    });

    addEventBtn.addEventListener('click', function() {
        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;

        if (!eventName || !eventDate) {
            alert('Please enter a valid event name and date.');
        } else {
            
            const [year, month, day] = eventDate.split('-');
            const dateKey = `${year}-${month}-${day}`;
            if (!events[dateKey]) {
                events[dateKey] = [];
            }
            events[dateKey].push(eventName);

            
            createCalendar(currentYear, currentMonth);

            eventNameInput.value = '';
            eventDateInput.value = '';
        }
    });
});




