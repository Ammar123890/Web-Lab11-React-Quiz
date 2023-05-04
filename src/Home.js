import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate =  useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("https://opentdb.com/api_category.php")
            .then((response) => setCategories(response.data.trivia_categories))
            .catch((error) => console.error(error));
    }, []);

    const handleStartQuiz = (category, difficulty) => {
        navigate(`/quiz/${category}/${difficulty}`);
    };

    return (
        <div>
            <h1>Quiz Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <button onClick={() => handleStartQuiz(category.id, "easy")}>
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
