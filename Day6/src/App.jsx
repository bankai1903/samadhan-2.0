import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileCard 
          name="Akshay" 
          role="Backend Developer" 
          location="Indore, India"
          skills={["Node.js", "Express", "MongoDB", "Docker"]}
          isOnline={true}
          rating={4.9}
          projects={45}
          bio="Passionate about scalable APIs and databases. Loves solving tough backend challenges."
          avatar="https://randomuser.me/api/portraits/men/32.jpg"
        />
        <ProfileCard 
          name="Meenakshi" 
          role="Frontend Developer" 
          location="Delhi, India"
          skills={["React", "Tailwind", "TypeScript", "Figma"]}
          isOnline={true}
          rating={4.8}
          projects={38}
          bio="Crafts pixel-perfect UIs with React & Tailwind. Always exploring new frontend trends."
          avatar="https://randomuser.me/api/portraits/women/44.jpg"
        />
        <ProfileCard 
          name="Mehek" 
          role="UI/UX Designer" 
          location="Bangalore, India"
          skills={["Figma", "Sketch", "Prototyping", "User Research"]}
          isOnline={false}
          rating={4.7}
          projects={29}
          bio="Design thinker focused on clean, user-friendly experiences. Loves Figma & prototyping."
          avatar="https://randomuser.me/api/portraits/women/65.jpg"
        />
      </div>
    </div>
  );
}

export default App;
