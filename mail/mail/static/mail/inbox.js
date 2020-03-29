let current_email = null

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', send_email);
  document.querySelector('#reply').addEventListener('click', reply_email);
  document.querySelector('#archive').addEventListener('click', () => archive_current_email(true));
  document.querySelector('#unarchive').addEventListener('click', () => archive_current_email(false)); 

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

  //Show list of emails 
fetch(`emails/${mailbox}`)
.then(response => response.json())
.then(result => {
    result.forEach(function(email){
      const email_element = document.createElement('tr');
      email_element.addEventListener('click', function() {display_email(email.id);});
      email_element.innerHTML = `<strong> ${email.sender}</strong> ${email.subject} ${email.timestamp}`;
      document.querySelector('#emails-view').append(email_element);
      // email_element.classList.add("boxborder");
      ;
    });
  });
}

//click an indiv email
function display_email(email_id) {
  //alert("Success")
  document.querySelector('#individual_email').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
fetch(`/emails/${email_id}`)
.then(response => response.json())
.then(email => {
    // Print email
    //console.log(email);
    current_email = email;
    From.innerHTML = `${email.sender}`;
    To.innerHTML = `${email.recipients}`;
    Subject.innerHTML = `${email.subject}`;
    Body.innerHTML = `${email.body}`;
    Timestamp.innerHTML = `${email.timestamp}`;
})}

fetch(`/emails/${email_id}`,{
  method: 'PUT',
  body: JSON.stringify({
    read: true
  })
})

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
      //redirect to mailbox
      load_mailbox('sent');
  }); 
  event.preventDefault();
}

//Reply to email
  function reply_email() {
    console.log(current_email);
    compose_email();
    document.querySelector('#compose-recipients').value = current_email.sender;
    document.querySelector('#compose-subject').value = current_email.subject;
    }

// Archive and Unarchive 
  function archive_current_email(archived) {
      fetch(`/emails/${current_email.id}`, {
        method: 'PUT',
        body: JSON.stringify({archived: archived,
        read:true})
      });
      load_mailbox('inbox');
      // if (document.querySelector('#archive').innerHTML=== 'Archive'){
      //   document.querySelector('#archive').innerHTML= 'Unarchive';
      // } else {
      //     document.querySelector('#archive').innerHTML = 'Archive'
      // }

    }
      