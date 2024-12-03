document.addEventListener('DOMContentLoaded', () => {
    const moodForm = document.getElementById('mood-form');
    const moodList = document.getElementById('mood-list');
    let editIndex = null;

    moodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mood = document.getElementById('mood').value;
        if (editIndex !== null) {
            updateMood(mood, editIndex);
        } else {
            logMood(mood);
        }
        moodForm.reset();
        editIndex = null;
    });

    moodList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            removeMood(index);
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            editMood(index);
        }
    });

    function logMood(mood) {
        const moods = getMoods();
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();
        moods.push({ mood, date: dateString, time: timeString });
        localStorage.setItem('moods', JSON.stringify(moods));
        displayMoods();
    }

    function getMoods() {
        const moods = localStorage.getItem('moods');
        return moods ? JSON.parse(moods) : [];
    }

    function removeMood(index) {
        const moods = getMoods();
        moods.splice(index, 1);
        localStorage.setItem('moods', JSON.stringify(moods));
        displayMoods();
    }

    function editMood(index) {
        const moods = getMoods();
        const mood = moods[index].mood;
        document.getElementById('mood').value = mood;
        editIndex = index;
    }

    function updateMood(mood, index) {
        const moods = getMoods();
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();
        moods[index] = { mood, date: dateString, time: timeString };
        localStorage.setItem('moods', JSON.stringify(moods));
        displayMoods();
    }

    function displayMoods() {
        const moods = getMoods();
        moodList.innerHTML = '';
        moods.forEach(({ mood, date, time }, index) => {
            const li = document.createElement('li');
            const dateSpan = document.createElement('span');
            dateSpan.textContent = `${date}: ${mood}`;
            dateSpan.title = time;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.dataset.index = index;
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.dataset.index = index;
            li.appendChild(dateSpan);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            moodList.appendChild(li);
        });
    }

    displayMoods();
});