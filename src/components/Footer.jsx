import { Link } from "react-router-dom";

 const Footer = () => {
  
  return (
    <footer className="text-white">
      <div className="container mx-auto  flex flex-col md:flex-row items-center justify-center ">
       
        <p className="text-sm">
          Made with <span role="img" aria-label="love">💗</span> by Mukul —
          Aspiring Full Frontend Developer
        </p>
      </div>
    </footer>
  );
};

export default Footer