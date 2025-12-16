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
  padding: 20px 40px;
  background-color: #1f232a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  color: #fff;
  border-bottom: 1px solid #2a2e36;
`;


const Logo = styled.h1`
  font-size: 2em;
  font-weight: 600;
  color: #00bcd4;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;

  &:hover {
    color: #0097a7;
  }
`;


const Nav = styled.nav`
  display: flex;
  gap: 50px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #e0e0e0;
  font-size: 1em;
  transition: color 0.2s ease;
  padding: 8px 16px;
  border-radius: 4px;
  
  &:hover {
    color: #00bcd4;
    background-color: rgba(0, 188, 212, 0.1);
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
  font-size: 2.5em;
  margin-bottom: 16px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
`;

const SubHeadline = styled.p`
  font-size: 1.25em;
  margin-bottom: 32px;
  font-weight: 400;
  color: #b0b0b0;
  max-width: 600px;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  padding: 12px 28px;
  font-size: 1em;
  font-weight: 500;
  color: #ffffff;
  background-color: #00bcd4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);

  &:hover {
    background-color: #0097a7;
    box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  width: 100vw;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
`;

const FeaturesTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 48px;
  color: #ffffff;
  font-weight: 600;
`;

// Features List Container
const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const FeatureItem = styled(motion.div)`
  width: 300px;
  padding: 32px 24px;
  background-color: #252525;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;

  h4 {
    color: #00bcd4;
    font-size: 1.25em;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    color: #b0b0b0;
    font-size: 0.95em;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #00bcd4;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;


const TestimonialsSection = styled.section`
  width: 100vw;
  padding: 80px 40px;
  background-color: #252525;
`;

const TestimonialsTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 48px;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
`;

const Testimonial = styled.div`
  max-width: 600px;
  margin: 24px auto;
  padding: 24px 28px;
  background-color: #1f1f1f;
  border-left: 3px solid #00bcd4;
  border-radius: 8px;
  color: #e0e0e0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    background-color: #242424;
  }

  p:first-child {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 12px;
    font-style: italic;
    color: #d0d0d0;
  }

  p:last-child {
    font-size: 0.9em;
    color: #00bcd4;
    font-weight: 500;
  }
`;

const AddReviewButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 12px 32px;
  background-color: #00bcd4;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);

  &:hover {
    background-color: #0097a7;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
  }
`;


//Blog Section

const BlogsSection = styled.section`
  width: 100vw;
  padding: 80px 40px;
  background-color: #1a1a1a;
  color: #e0e0e0;
`;

const BlogsTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 40px;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BlogPost = styled.div`
  padding: 24px;
  background-color: #252525;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #00bcd4;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const BlogTitle = styled.h4`
  font-size: 1.25em;
  color: #00bcd4;
  margin-bottom: 12px;
  font-weight: 600;
`;

const BlogContent = styled.p`
  font-size: 0.95em;
  line-height: 1.7;
  color: #b0b0b0;
`;

//Footer Content
const Footer = styled.footer`
  width: 100vw;
  padding: 60px 40px 30px;
  background-color: #1f232a;
  border-top: 1px solid #2a2e36;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
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
  margin: 12px;
  padding: 0;
`;

const SectionTitle = styled.h4`
  margin-bottom: 16px;
  color: #00bcd4;
  font-size: 1.1em;
  font-weight: 600;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #b0b0b0;
  transition: color 0.2s ease;
  margin-bottom: 8px;
  display: block;
  font-size: 0.9em;

  &:hover {
    color: #00bcd4;
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
  padding-top: 24px;
  margin-top: 32px;
  border-top: 1px solid #2a2e36;
  text-align: center;
  font-size: 0.9em;
  color: #808080;
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
    <FooterBottom>&copy; 2024-2026 My Tutor. All rights reserved.</FooterBottom>
    </Footer>
    </Container>
  );
};

export default Home;
