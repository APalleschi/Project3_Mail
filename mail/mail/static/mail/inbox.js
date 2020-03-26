document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', send_email);
//reply
//archive

  // By default, load the inbox
  load_mailbox('inbox');
});
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#individual_email').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#individual_email').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //Show emails 
fetch(`emails/${mailbox}`)
.then(response => response.json())
.then(result => {
    // Print result
    console.log(result);
    //insert if valid ***

    result.forEach(function(email){
      //need to add an href within li
      const email_element = document.createElement('div');
      email_element.addEventListener('click', function() {display_email(email.id);});
      email_element.innerHTML = `${email.recipients}`;
      //add class 
      document.querySelector('#emails-view').append(email_element);
    });
  });
}

//indiv email
function display_email(email_id) {
  alert("Success")
  document.querySelector('#individual_email').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
fetch(`/emails/${email_id}`)
.then(response => response.json())
.then(email => {
    // Print email
    console.log(email);
    const recipients = document.querySelector('#compose-recipients').value;
    document.querySelector('#To').innerHTML = ${recipients};
    //show archive and unarchive 
    //hide other views
    //
    // ... do something else with email ...
})}

// Send email
function send_email(event) {
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  console.log(`SUCESS!`);

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent');
  });
  //redirect
  event.preventDefault();
}

  //to do 

  // show individual email


  //REPLY TO EMAIL
  function reply_email() {
    compose_email()
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
  }
