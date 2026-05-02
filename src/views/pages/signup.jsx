import React, { useState, useRef, useEffect } from 'react';

export default function SignUp() {
    const value1 = useRef(Math.random().toString(36).substring(2, 8));
    const [captcha, SetCaptcha] = useState("");

    function Validate() {
        if (value1.current === captcha) {
            document.getElementById("captcha-status").setAttribute("style", "color: green");
            document.getElementById("captcha-status").innerHTML = "Captcha Validado!"
        } else {
            document.getElementById("captcha-status").setAttribute("style", "color: red");
            document.getElementById("captcha-status").innerHTML = "Captcha Invalido!"
        }
    }

    function RenderCaptcha() {
        var canvas = document.getElementById("captcha");
        var ctx = canvas.getContext("2d");
        ctx.rect(0, 0, 80, 30);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill()
        ctx.font = "20px Arial";
        ctx.fillStyle = "#AAAAAA";
        ctx.textAlign = "center";
        ctx.strokeText(value1.current, canvas.width / 2, canvas.height / 2 + 7);
    }

    useEffect(() => {
        RenderCaptcha();
    }, [value1.current]);

    return (
        <article className="signup">
            <div className="window">
                <h2>Crie sua conta</h2>
                <form style={{ marginTop: "30px" }}>
                    <label>Nome de usuário</label><br></br>
                    <input name="username" type="text" autoComplete="username"></input><br></br>
                    <label>Email</label><br></br>
                    <input name="email" type="email" autoComplete="username"></input><br></br>
                    <label>Senha</label><br></br>
                    <input name="pwd" type="password" autoComplete="current-password"></input><br></br>
                    <div className="captcha-wrapper">
                        <div className="captcha">
                            <label>Digite para prosseguir:</label><br></br>
                            <div>
                                <canvas id="captcha" width="80" height="30" style={{ margin: "0 20px" }}></canvas>
                                <input name="captcha" type="text" value={captcha} onChange={e => SetCaptcha(e.target.value)}></input>
                            </div>
                            <div id="captcha-status"></div>
                        </div>
                    </div>
                </form>
                <button onClick={e => Validate()}>Cadastrar</button>
            </div>
        </article>
    );
}