import '../styles/routes/contact.scss'

function Contact() {
    return (
        <div className="ContactUsSection">
            <div className="ContactUsSection__container">
                <p className='ContactUsSection__container--heading'>Contact Us</p>
                <div className='ContactUsSection__container--details'>
                    <div className='ContactUsSection__container--details__card'>
                        <p className='ContactUsSection__container--details__card--name'>Rhea Vohra</p>
                        <p className='ContactUsSection__container--details__card--designation'>Lead Organizer</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9810790034</p>
                    </div>
                    <div className='ContactUsSection__container--details__card'>
                        <p className='ContactUsSection__container--details__card--name'>Srinithya Pasupuleti</p>
                        <p className='ContactUsSection__container--details__card--designation'>Co-Lead Organizer</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-8328251153</p>
                    </div><div className='ContactUsSection__container--details__card'>
                        <p className='ContactUsSection__container--details__card--name'>Shreyaa Venkataraman</p>
                        <p className='ContactUsSection__container--details__card--designation'>Managing Director</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9791185259</p>
                    </div><div className='ContactUsSection__container--details__card'>
                        <p className='ContactUsSection__container--details__card--name'>Urshita Rathi</p>
                        <p className='ContactUsSection__container--details__card--designation'>Finance Head</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9636896601</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
