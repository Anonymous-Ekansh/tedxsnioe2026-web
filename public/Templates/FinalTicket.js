export const FinalTicketTemplate = (name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket Confirmation</title>
    </head>

    <body>
        <div>
            <p>Dear ${name},<br/><br /></p>
            <p>You’re officially a part of the 7th edition of TEDxShiv Nadar University annual conference. We cannot wait for you to experience the riveting talks, the mesmerising performances, the finger-licking delicacies, and so much more we have to offer!<br/></p>
            <img src="cid:tedx@unique" alt="tedx_ticket" style="display: block; width: 400px;">
            <p><b>Please note: It is mandatory for you to carry a soft copy of the E-ticket for your entry.</b><br /><br/></p>
            <p>Here are the details - <br/></p>
            <p><b>Date - </b>Sunday 24th, September</p>
            <p><b>Registration + Attendee Activities - </b>9:00 AM - 10:00 AM (G Block entrance)</p>
            <p><b>Venue - </b>G Block Auditorium</p>
            <p><b>Dress Code - </b>Business Formals</p>
            <br/>
            <p>Please note registrations for attendees close at 10AM. The food coupons will be issued to all attendees at registration, without which the attendees will not be able to avail their meals for the day.<br/>Please make it a point to register when you arrive!</p>
            <br/>
            <p>Attached below is the itinerary for the day.</p>
            <br />
            <img src="cid:tedx@uniqueIt" alt="tedx_itinerary" style="display: block; width: 600px;" />
            <p>We’re so excited for you to experience this with us :)<p>
        </div>
    </body>

    </html>
    `
}