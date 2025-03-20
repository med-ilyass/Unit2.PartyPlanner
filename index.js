
const API_BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api';
const eventsEndpoint = `${API_BASE_URL}/COHORT_CODE/recipes`;


let state = {
  events: []
};
const root = document.getElementById('root');

function render() {
  root.innerHTML = '';
  const header = document.createElement('h1');
  header.textContent = 'Party Planner';
  root.appendChild(header);
  const avgPrice = state.events.length
    ? Math.round(state.events.reduce((sum, event) => sum + event.price, 0) / state.events.length)
    : 0;
  const avgPar = document.createElement('p');
  avgPar.textContent = `The Average starting price is $${avgPrice}`;
  root.appendChild(avgPar);


  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" id="eventName" placeholder="Event Name" required>
    <input type="date" id="eventDate" required>
    <input type="time" id="eventTime" required>
    <input type="text" id="eventLocation" placeholder="Location" required>
    <textarea id="eventDescription" placeholder="Description" required></textarea>
    <button type="submit">Add Party</button>
  `;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEvent = {
      name: document.getElementById('eventName').value,
      date: document.getElementById('eventDate').value,
      time: document.getElementById('eventTime').value,
      location: document.getElementById('eventLocation').value,
      description: document.getElementById('eventDescription').value,
      price: parseInt(Math.floor(Math.random() * 100) + 20) 
    };
    await addEvent(newEvent);
    form.reset();
  });
  root.appendChild(form);

  const eventsContainer = document.createElement('div');
  eventsContainer.id = 'eventsContainer';

  
  state.events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Time: ${event.time}</p>
      <p>Location: ${event.location}</p>
      <p>Description: ${event.description}</p>
      <p>Starting Price: $${event.price}</p>
    `;
    
    const delButton = document.createElement('button');
    delButton.textContent = 'Delete';
    delButton.addEventListener('click', async () => {
      await deleteEvent(event.id);
    });
    eventCard.appendChild(delButton);
    eventsContainer.appendChild(eventCard);
  });
  root.appendChild(eventsContainer);
}

render();

async function init() {
  await getEvents();
}

init();