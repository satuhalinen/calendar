const knowledgeBase = [
    // Admin Side Queries and Responses
    { role: "user", content: "How do I create a new calendar?", keywords: ["create a calendar", "create calendar", "new"] },
    { role: "assistant", content: "To create a new calendar, go to the admin dashboard and click on the 'Create Calendar'. Then, fill in the details such as title, colors, background image or color, and choose a topic and alternative." },
    { role: "user", content: "What topics can I choose from when creating a calendar?", keywords: ["topics", "choose", "creating"] },
    { role: "assistant", content: "You can choose from topics such as Adults, Animals, Elderly, and Children and Teenagers when creating a calendar." },
    { role: "user", content: "How does the voluntary calendar work?", keywords: ["voluntary", "work"] },
    { role: "assistant", content: "The voluntary calendar allows you to choose who to help and how, through deeds or donations adding topics and alternatives to your calendar hatches." },

    // End-User Side Queries and Responses
    { role: "user", content: "How do I register for an account?", keywords: ["register", "account"] },
    { role: "assistant", content: "To register for an account, click on the 'Register' link on the header or login page and fill out the registration form with your details." },
    { role: "user", content: "How do I log in to my account?", keywords: ["login", "log in"] },
    { role: "assistant", content: "To log in to your account, click on the 'Login' link on the header and enter your email and password." },
    { role: "user", content: "How do I log out of my account?", keywords: ["logout", "log out"] },
    { role: "assistant", content: "To log out of your account, click on the 'Logout' link on the header or profile page." },
    { role: "user", content: "How do I view my profile information?", keywords: ["view", "profile"] },
    { role: "assistant", content: "To view your profile information, go to your Profile page where you can see your name, email, and other details." },
    { role: "user", content: "How do I reset my password?", keywords: ["reset", "password"] },
    { role: "assistant", content: "To reset your password, go to your Profile and click Account Settings and follow the instructions to reset your password." },
    { role: "user", content: "How can I access the calendars?", keywords: ["access", "calendars"] },
    { role: "assistant", content: "Once logged in, you can access the calendars by navigating to the 'Calendars' section. From there, you can browse, save and use the calendars." },
    { role: "user", content: "What happens when I open a hatch on the calendar?", keywords: ["open", "hatch", "calendar"] },
    { role: "assistant", content: "When you open a hatch on the calendar, you'll see various options to engage with. For example, you might find opportunities to foster animals or contribute to community events. By participating, you can track your progress and contribute to your community." },
    { role: "user", content: "Can I save my favorite calendars?", keywords: ["save", "favorite", "calendars"] },
    { role: "assistant", content: "Yes, you can add calendars to your favorites by clicking on the 'Add to My Calendars' button. This allows you to easily access your favorite calendars later." },
    { role: "user", content: "Can you tell me about this page?", keywords: ["about this page", "about VOCA", "this app", "VOCA"] },
    { role: "assistant", content: "At VOCA, we're on a mission to spread kindness, one hatch at a time! Our diverse team of passionate web developers is dedicated to creating innovative solutions for social good. With our advent-style calendar creation service, users can personalize calendars that inspire acts of generosity throughout the holiday season and beyond. From donating to volunteering, our calendars promote meaningful acts that benefit others. Whether for personal use or as a gift, or if you represent a business or organization, we invite you to join our community and create a calendar that aligns with your values. Please explore our Landing page and About page to find out more." }
];

export default knowledgeBase;
