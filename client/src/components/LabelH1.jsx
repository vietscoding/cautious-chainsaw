export default function LabelH1(props) {
    return (
        <h1 className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.25">{props.text}</h1>
    );
}