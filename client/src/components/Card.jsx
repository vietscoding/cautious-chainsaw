import decadePic from '../assets/decade.jpg'

function Card() {
    return (
        <div className="card">
            <img id="card" src={decadePic} alt="profile picture" ></img>
            <h2>Name</h2>
            <p>This is a description</p>
        </div>
    );
}

export default Card;