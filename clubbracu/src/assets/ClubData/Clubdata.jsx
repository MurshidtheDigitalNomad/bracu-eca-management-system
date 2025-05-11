import React from 'react';
import TechClub from '../ClubPictures/TechClub.jpg'
import ArtClub from '../ClubPictures/ArtClub.png'
import CodingClub from '../ClubPictures/CodingClub.png'
import CulturalClub from '../ClubPictures/CulturalClub.jpg'
import DebateSociety from '../ClubPictures/DebateSociety.png'
import EnvironmentalClub from '../ClubPictures/EnvironmentalClub.jpg'
import LiteratureSociety from '../ClubPictures/LiteratureSociety.png'
import MusicClub from '../ClubPictures/MusicClub.jpg'
import PhotographyClub from '../ClubPictures/PhotographyClub.png'
import SportsClub from '../ClubPictures/SportsClub.jpg'



const clubs = [
    {
      club_id: 'tech-club',
      name: 'Tech Innovators',
      image: `${TechClub}`,
      description: "Tech Innovators Club brings together tech enthusiasts to collaborate on projects, learn new technologies, and innovate. Members work on real-world problems using cutting-edge tools and programming languages. We host workshops, hackathons, and discussions to expand our knowledge and skills in tech. It's an exciting community where curiosity thrives and breakthroughs happen.",
      vision: 'To foster a community of forward-thinking individuals who will drive the future of technology.',
      members: 24,
      contact: {
        facebook: 'https://facebook.com/tech_innovators',
        instagram: 'https://instagram.com/tech_innovators'
      }
    },
    {
      club_id: 'art-club',
      name: 'Creative Arts Club',
      image: `${ArtClub}`,
      description: 'Creative Arts Club fosters the exploration of all forms of art, from visual arts to digital media. The club encourages students to express themselves through painting, sculpture, photography, and other creative mediums. We believe in the power of creativity to inspire change and connect people. Regular art exhibitions and collaborative projects are organized to showcase talent and share art with the world.',
      vision: 'To inspire creativity and connect artists in ways that enhance self-expression and collaboration.',
      members: 21,
      contact: {
        facebook: 'https://facebook.com/creative_arts_club',
        instagram: 'https://instagram.com/creative_arts_club'
      }
    },
    {
      club_id: 'sport-club',
      name: 'Sports Enthusiasts',
      image: `${SportsClub}`,
      description: 'The Sports Enthusiasts Club is dedicated to promoting physical fitness and sportsmanship within the university. Whether you’re into competitive sports or just enjoying a casual game with friends, this club provides an inclusive environment for everyone. The club organizes tournaments, weekly meetups, and fitness challenges to keep members active and healthy.',
      vision: 'To create an inclusive and active environment where students can engage in sports and fitness.',
      members: 36,
      contact: {
        facebook: 'https://facebook.com/sports_enthusiasts',
        instagram: 'https://instagram.com/sports_enthusiasts'
      }
    },
    {
      club_id: 'music-club',
      name: 'Music and Rhythm',
      image: `${MusicClub}`,
      description: 'Music and Rhythm Club unites students who share a passion for music in its many forms. Whether you’re a performer, composer, or music lover, this club offers a space for all musical talents. We host jam sessions, music competitions, and events to foster a love for music and connect students through rhythm and harmony.',
      vision: 'To create a space where students can come together to celebrate and create music in all its forms.',
      members: 10,
      contact: {
        facebook: 'https://facebook.com/music_and_rhythm',
        instagram: 'https://instagram.com/music_and_rhythm'
      }
    },
    {
      club_id: 'literature-club',
      name: 'Literature Society',
      image: `${LiteratureSociety}`,
      description: 'Literature Society brings together book lovers and writers. The club holds regular book discussions, writing workshops, and literary events to foster a deeper appreciation for the written word. Whether you’re into fiction, poetry, or non-fiction, we provide a platform to explore, create, and share literary works.',
      vision: 'To promote a love of reading, writing, and discussion about literature among students.',
      members: 50,
      contact: {
        facebook: 'https://facebook.com/literature_society',
        instagram: 'https://instagram.com/literature_society'
      }
    },
    {
      club_id: 'photography-club',
      name: 'Photography Club',
      image: `${PhotographyClub}`,
      description: 'Photography Club celebrates the art of visual storytelling. We provide workshops, photo walks, and exhibitions to showcase the creativity and technical skills of our members. Whether you are a beginner or a seasoned photographer, there’s something for everyone to learn and share.',
      vision: 'To capture and preserve moments through the art of photography, fostering creativity and technical skill.',
      members: 18,
      contact: {
        facebook: 'https://facebook.com/photography_club',
        instagram: 'https://instagram.com/photography_club'
      }
    },
    {
      club_id: 'debate-society',
      name: 'Debate Society',
      image: `${DebateSociety}`,
      description: 'Debate Society provides a platform for students to engage in healthy, intellectual debates on various social, political, and scientific topics. Through rigorous debates and discussions, members develop critical thinking, communication, and argumentation skills.',
      vision: 'To promote healthy debates and discussions that foster critical thinking and enhance public speaking skills.',
      members: 28,
      contact: {
        facebook: 'https://facebook.com/debate_society',
        instagram: 'https://instagram.com/debate_society'
      }
    },
    {
      club_id: 'environmental-club',
      name: 'Environmental Awareness Club',
      image: `${EnvironmentalClub}`,
      description: 'The Environmental Awareness Club is dedicated to promoting sustainable practices and environmental conservation. We organize tree planting events, clean-up drives, and educational seminars to spread awareness about environmental issues and ways to address them.',
      vision: 'To foster a sustainable and environmentally conscious community that actively contributes to a greener planet.',
      members: 33,
      contact: {
        facebook: 'https://facebook.com/environmental_awareness',
        instagram: 'https://instagram.com/environmental_awareness'
      }
    },
    {
      club_id: 'coding-club',
      name: 'Coding Club',
      image: `${CodingClub}`,
      description: 'The Coding Club is a place for aspiring coders to collaborate and learn together. Whether you’re into web development, app creation, or data science, we have resources and events to help you grow your coding skills. The club hosts coding challenges, hackathons, and learning sessions to encourage creativity and problem-solving.',
      vision: 'To create a community of passionate coders who collaborate, learn, and innovate together.',
      members: 40,
      contact: {
        facebook: 'https://facebook.com/coding_club',
        instagram: 'https://instagram.com/coding_club'
      }
    },
    {
      club_id: 'cultural-club',
      name: 'Cultural Exchange Club',
      image: `${CulturalClub}`,
      description: 'Cultural Exchange Club promotes global understanding and appreciation for diverse cultures. The club organizes events, cultural nights, and language exchange programs to bring together students from different backgrounds and foster a sense of unity and shared learning.',
      vision: 'To bridge cultures and create a platform where students can exchange ideas and traditions, promoting global understanding.',
      members: 22,
      contact: {
        facebook: 'https://facebook.com/cultural_exchange',
        instagram: 'https://instagram.com/cultural_exchange'
      }
    }
  ];

  export default clubs;
  
  