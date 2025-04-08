import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import FileUpload from '../Frontend/FileUpload/FileUpload';
import { ReactTyped } from 'react-typed';
import playstore from './playstore-icon.png';
import appstore from './apple-icon.png';
// import Chatbot from '../chatbot';
import Chat from '../Chat';


const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: #282c34; // Dark blue-gray background
  color: #f5f5f5;
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
width: 100vw;
display: flex;
justify-content: space-between;
align-items: center;
padding: 40px 20px;
background-color: #1f232a; // Darker gray for header
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
position: relative;
z-index: 1000;
color: #fff;
overflow: hidden; // To ensure the sliding effect is contained within the header

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px; // Thin line height
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  background-size: 200% 100%;
  background-position: -100% 0;
  animation: slide 2s infinite;
}

@keyframes slide {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
`;


const Logo = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  background: linear-gradient(90deg, #00bcd4, #3b82f6, #00bcd4);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 5s ease infinite;
  transition: transform 0.3s ease;

  /* Subtle lighting effect */
  text-shadow: 0 0 8px rgba(0, 188, 212, 0.6), 0 0 15px rgba(0, 188, 212, 0.3);

  &:hover {
    transform: scale(1.1);
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


const Nav = styled.nav`
  display: flex;
  gap: 50px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #00bcd4; // Cyan color for navigation links
  font-size: 1.2em;
  transition: color 0.3s ease, text-decoration 0.3s ease;
  &:hover {
    color: #ff5722; // Orange color on hover
    text-decoration: underline;
  }
`;



const HeroSection = styled(motion.section)`
  width: 100vw;
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
  color: #ffffff;
  position: relative;
`;

const TypingText = styled.div`
  font-size: 3.5em;
  margin-bottom: 20px;
  font-weight: 700;
  color: #00bcd4; // Cyan color for typing effect
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SubHeadline = styled.p`
  font-size: 2em;
  margin-bottom: 40px;
  font-weight: 300;
  color: #ffffff;
`;

const CTAButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.5em;
  color: #ffffff;
  background-color: #00bcd4; // Cyan color for CTA button
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0097a7; // Darker cyan on hover
    transform: scale(1.05);
  }
`;

const FeaturesSection = styled.section`
  width: 100vw;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c; // Darker background for features section
  position: relative;
  overflow: hidden;

  // Background Graphics
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, transparent 70%);
    background-size: 200% 200%;
    background-position: -50% -50%;
    animation: backgroundAnimation 10s linear infinite;
    z-index: 0;
  }
  
  @keyframes backgroundAnimation {
    0% {
      background-position: -50% -50%;
    }
    100% {
      background-position: 50% 50%;
    }
  }

  // Adjust content to be above background graphics
  & > * {
    position: relative;
    z-index: 1;
  }
`;

// Title
const FeaturesTitle = styled.h3`
  font-size: 2.5em;
  margin-bottom: 40px;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// Features List Container
const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

// Feature Item
const FeatureItem = styled(motion.div)`
  width: 300px;
  padding: 20px;
  background-color: #3a3a3a; // Slightly lighter gray for feature items
  border: 1px solid #333;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  // Adding a subtle glow effect on hover
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
  }
  
  // Add an animation to the feature items
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  animation: fadeInUp 0.6s ease-out;
`;


const TestimonialsSection = styled.section`
  width: 100vw;
  padding: 80px 20px;
  background: linear-gradient(135deg, #121212 25%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
`;

const TestimonialsTitle = styled.h3`
  font-size: 3em;
  margin-bottom: 40px;
  text-align: center;
  color: #00bcd4;
  font-weight: 700;
  text-shadow: 0px 0px 20px rgba(0, 188, 212, 0.5);
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Testimonial = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  padding: 30px;
  background: radial-gradient(circle at top left, #1f1f1f, #121212);
  border: 1px solid #00bcd4;
  border-radius: 15px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 188, 212, 0.7);
  transform: rotate(-1deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: rotate(1deg) scale(1.08);
    box-shadow: 0px 12px 40px rgba(0, 188, 212, 1);
  }

  p {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #e0f7fa;
    text-shadow: 0px 0px 10px rgba(0, 188, 212, 0.5);
  }
`;

const AddReviewButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 15px 30px;
  background-color: #00bcd4;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-size: 1.2em;
  font-weight: bold;
  box-shadow: 0px 6px 20px rgba(0, 188, 212, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #008c9e;
    transform: translateY(-5px);
  }
`;


//Blog Section

const BlogsSection = styled.section`
  width: 100vw;
  padding: 60px 20px;
  background-color: #1a1a1a; // Dark background for the blog section
  color: #e0e0e0; // Light text color
`;

const BlogsTitle = styled.h3`
  font-size: 2.5em;
  margin-bottom: 30px;
  text-align: center;
  color: #00bcd4; // Light blue color for the title
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BlogPost = styled.div`
  padding: 20px;
  background-color: #2c2c2c; // Slightly lighter gray for blog posts
  border: 1px solid #333;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: #383838; // Slightly lighter on hover
  }
`;

const BlogTitle = styled.h4`
  font-size: 1.8em;
  color: #00bcd4; // Light blue color for blog titles
  margin-bottom: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5722; // Orange color on hover
  }
`;

const BlogContent = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
`;

//Footer Content
const Footer = styled.footer`
  width: 100vw;
  padding: 60px 20px;
  background-color: #1f232a; // Dark gray background
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap; // Ensures proper layout on smaller screens
`;

const Section = styled.div`
  flex: 1;
  min-width: 220px;
  margin: 20px;
  padding: 20px;
  background-color: #252a33; // Slightly lighter background for sections
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const SectionTitle = styled.h4`
  margin-bottom: 20px;
  color: #00bcd4;
  font-size: 1.5em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 3px;
    background-color: #00bcd4;
    transition: width 0.3s ease;

    ${Section}:hover & {
      width: 100%;
    }
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #00bcd4;
  transition: color 0.3s ease, text-decoration 0.3s ease;
  margin-bottom: 10px;
  display: block;

  &:hover {
    color: #ff5722;
    text-decoration: underline;
  }
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #1f232a;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-5px);
  }

  img {
    width: 100px;
    margin-right: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  a {
    color: #00bcd4;
    font-size: 1.5em;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #ff5722;
      transform: scale(1.1);
    }
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid #333;
  text-align: center;
  font-size: 1.2em;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -5px;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff5722, #00bcd4, #ff5722);
    animation: slidebar 5s linear infinite;
  }

  @keyframes slidebar {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;


const ContactInfo = styled.p`
  margin-bottom: 20px;
`
const handleContactClick = () => {
  window.open('/contact', '_blank');
};

const Home = ({ setfunc }) => {
  const navigate = useNavigate();

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuresSpring = useSpring({
    opacity: featuresInView ? 1 : 0,
    transform: featuresInView ? 'translateY(0)' : 'translateY(50px)',
  });

  const testimonialsSpring = useSpring({
    opacity: testimonialsInView ? 1 : 0,
    transform: testimonialsInView ? 'translateY(0)' : 'translateY(50px)',
  });


  
  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>MY TUTOR</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/summarize">Summarize</NavLink>
          <NavLink to="/flashcards">Flashcards</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink onClick={handleContactClick}>Contact</NavLink>
        </Nav>
      </Header>
      <HeroSection
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <TypingText>
          <ReactTyped
            strings={['Welcome to MY TUTOR', 'Your AI-powered study companion']}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </TypingText>
        <SubHeadline>Transforming your study experience</SubHeadline>
        <FileUpload setfunc={setfunc} />
      </HeroSection>
      <Chat/>
      <FeaturesSection id="features" ref={featuresRef}>
        <FeaturesTitle>Features</FeaturesTitle>
        <FeaturesList>
          <animated.div style={featuresSpring}>
            <FeatureItem>
              <h4>Smart Flashcards</h4>
              <p>Automatically generated flashcards from your study materials.</p>
              <CTAButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/flashcards')}
              >
                Generate Flashcards
              </CTAButton>
            </FeatureItem>
          </animated.div>
          <animated.div style={featuresSpring}>
            <FeatureItem>
              <h4>Personalized Quiz</h4>
              <p>Quizzes tailored to your learning progress and needs.</p>
              <CTAButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/quiz')}
              >
                Start Quiz
              </CTAButton>
            </FeatureItem>
          </animated.div>
          <animated.div style={featuresSpring}>
            <FeatureItem>
              <h4>Short Summarizing</h4>
              <p>Summarize your entire study material in brief.</p>
              
                <CTAButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/summarization')}
                >
                  Get Summarize
                </CTAButton>
              
            </FeatureItem>
          </animated.div>
        </FeaturesList>
      </FeaturesSection>
      <TestimonialsSection ref={testimonialsRef}>
      <TestimonialsTitle>What Our Users Say</TestimonialsTitle>
      <animated.div style={testimonialsSpring}>
        <Testimonial>
          <p>"My Tutor has completely transformed the way I study. The AI-generated flashcards are a game-changer!"</p>
          <p>- Alex R.</p>
        </Testimonial>
      </animated.div>
      <animated.div style={testimonialsSpring}>
        <Testimonial>
          <p>"I Never Expected Studying to be this much fun and easy!"</p>
          <p>- MadhuSree M.</p>
        </Testimonial>
      </animated.div>
      <AddReviewButton>Add Your Review</AddReviewButton>
    </TestimonialsSection>
      <BlogsSection>
  <BlogsTitle>Latest Blogs</BlogsTitle>
  <BlogList>
    <BlogPost>
      <BlogTitle>How AI is Transforming Education</BlogTitle>
      <BlogContent>
        Artificial intelligence is revolutionizing education by providing personalized learning experiences...
      </BlogContent>
    </BlogPost>
    <BlogPost>
      <BlogTitle>Top 10 Study Tips for Students</BlogTitle>
      <BlogContent>
        Discover the top 10 study tips that can help you maximize your learning potential...
      </BlogContent>
    </BlogPost>
    <BlogPost>
      <BlogTitle>The Future of Online Learning</BlogTitle>
      <BlogContent>
        Explore the future of online learning and how technology is shaping the way we learn...
      </BlogContent>
    </BlogPost>
  </BlogList>
</BlogsSection>
<Footer>
<FooterContent>
  <Section>
    <SectionTitle>Quick Links</SectionTitle>
    <FooterLink href="/">Home</FooterLink>
    <FooterLink href="/services">Services</FooterLink>
    <FooterLink href="/contact">Contact Us</FooterLink>
    <FooterLink href="/about">About Us</FooterLink>
  </Section>
  <Section>
    <SectionTitle>Services</SectionTitle>
    <FooterLink href="/summarize">Summarize</FooterLink>
    <FooterLink href="/flashcards">Flashcards</FooterLink>
    <FooterLink href="/quiz">Quiz</FooterLink>
    <FooterLink href="/resources">Resources</FooterLink>
  </Section>
  <Section>
    <SectionTitle>Contact Us</SectionTitle>
    <ContactInfo>Email: support@mytutor.com</ContactInfo>
    <ContactInfo>Phone: +91 99955 55999</ContactInfo>
    <SocialLinks>
      <FooterLink href="https://www.linkedin.com/in/abhisheck-poorani-obuli" target="_blank">
        LinkedIn
      </FooterLink>
      <FooterLink href="https://facebook.com/mytutor" target="_blank">
        Facebook
      </FooterLink>
      <FooterLink href="https://instagram.com/mytutor" target="_blank">
        Instagram
      </FooterLink>
      <FooterLink href="https://www.youtube.com/@MyTutorWebCoUk" target="_blank">
        YouTube
      </FooterLink>
    </SocialLinks>
  </Section>
  <Section>
    <SectionTitle>Get the App</SectionTitle>
    <StoreButton href="https://play.google.com/store/apps/" target="_blank">
      <img src={playstore} alt="Google Play" />
    </StoreButton>
    <StoreButton href="https://www.apple.com/app-store/" target="_blank">
      <img src={appstore} alt="App Store" />
    </StoreButton>
  </Section>
    </FooterContent>
    <FooterBottom>&copy; 2024 My Tutor. All rights reserved.</FooterBottom>
    </Footer>
    </Container>
  );
};

export default Home;
