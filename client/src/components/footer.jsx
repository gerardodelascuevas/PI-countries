import github from "./img/github.png"
import linkdn from "./img/linkedIn.png"
import './footer.css'

export default function Footer(){

    return (
        <div className="footer">
            <a href="https://www.linkedin.com/in/gerardo-de-las-cuevas-562a0b1a5/">
            <img src={linkdn} alt="linkdln" className="img-footer"/> </a>            
              <a href="https://github.com/gerardodelascuevas">  
            <img src= {github} alt='github' className="img-footer"/> </a>           
        </div>
    )
}