//import { render } from "@testing-library/react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuizService from "./quizService";
import QuestionBox from "./components/questionBox";
import Results from "./components/Results";

class QuizApp extends Component{

    state = {
        QuestionBank :[],
        score:0 ,
        responces: 0,

    };

    getQuestions = () =>{
        QuizService().then(questions =>{
            this.setState({
                QuestionBank: questions
            });
        });
    };

    computeAnswer = (answers , correctAnswer) =>{
        if(answers === correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
       this.setState({
        responces: this.state.responces < 5 ?  this.state.responces + 1 : 5
       })
    };

    PlayAgain = ()=>{
        this.getQuestions();
        this.setState({
            score:0,
            responces:0
        });
    }

    componentDidMount(){
        this.getQuestions();
    };

    render (){
        return(
            <div className="container">
                <div className="title">Quiz App</div>
                {this.state.QuestionBank.length > 0 && 
                this.state.responces < 5 &&
                this.state.QuestionBank.map(
                    ({question, answers , correct, questionId}) => (
                        <QuestionBox question={question}
                        options={answers}
                        Key={questionId}
                        selected={answers => this.computeAnswer(answers , correct)}
                         />
                    )
                    
                    )} 
 
               {this.state.responces === 5 ? (<Results score={this.state.score} PlayAgain={this.PlayAgain} />) : null}
            </div>
        )
    }
}

ReactDOM.render(<QuizApp />, document.getElementById("root"));

