import { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { db, analytics } from '../../auth/firebase';
import { setDoc, doc, collection } from 'firebase/firestore';
import ChatBot from '../../components/chatBot/ChatBot';
import './contact.css';

const ContactForm = () => {
    const [showChatBot, setShowChatBot] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [messageSent, setMessageSent] = useState(false);

    const handleCloseChatBot = () => {
        setShowChatBot(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill out all fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const contactFormsCollectionRef = collection(db, 'contactForms');

            await setDoc(doc(contactFormsCollectionRef), formData);

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setMessageSent(true);
            setTimeout(() => setMessageSent(false), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <Col className="mainContent contactWrap">
                <Container className="contactContainer">
                    <Form className="contactForm" onSubmit={handleSubmit}>
                        <p className="contactTitle">Contact Us</p>
                        {messageSent && <p className="messageSent">Message sent!</p>}
                        <Form.Group controlId="formName">
                            <Form.Label className='formGroupTitle'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                className="formInput"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className='formGroupTitle'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                className="formInput"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSubject">
                            <Form.Label className='formGroupTitle'>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the subject"
                                name="subject"
                                className="formInput"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label className='formGroupTitle'>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter your message"
                                name="message"
                                className="formInput"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="contactFormButton" controlId="formButton">
                            <Button className="contactButton" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Col>
            <ChatBot showInitially={!showChatBot} handleClose={handleCloseChatBot} />
        </div>
    );
};

export default ContactForm;
