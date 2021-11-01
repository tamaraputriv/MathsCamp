import Mascot1 from "../images/Mascots/mascot1.png";
import Mascot2 from "../images/Mascots/mascot2.png";
import Mascot3 from "../images/Mascots/mascot3.png";
import Mascot4 from "../images/Mascots/mascot4.png";
import Mascot5 from "../images/Mascots/mascot5.png";
import Mascot6 from "../images/Mascots/mascot6.png";
import Mascot7 from "../images/Mascots/mascot7.png";
import Mascot8 from "../images/Mascots/mascot8.png";
import Mascot9 from "../images/Mascots/mascot9.png";
import Mascot10 from "../images/Mascots/mascot10.png";
import Mascot11 from "../images/Mascots/mascot11.png";
import Mascot12 from "../images/Mascots/mascot12.png";
import Mascot13 from "../images/Mascots/mascot13.png";
import Mascot14 from "../images/Mascots/mascot14.png";
import Mascot15 from "../images/Mascots/mascot15.png";
import Mascot16 from "../images/Mascots/mascot16.png";
import Mascot17 from "../images/Mascots/mascot17.png";
import Mascot18 from "../images/Mascots/mascot18.png";
import Mascot19 from "../images/Mascots/mascot19.png";
import Mascot20 from "../images/Mascots/mascot20.png";
import Mascot21 from "../images/Mascots/mascot21.png";
import Mascot22 from "../images/Mascots/mascot22.png";
import Mascot23 from "../images/Mascots/mascot23.png";
import Mascot24 from "../images/Mascots/mascot24.png";

export const getMascotImage = (index) => {
    switch(index){
        case 0: {
            return Mascot1;
        }
        case 1: {
            return Mascot2;
        }
        case 2: {
            return Mascot3;
        }
        case 3: {
            return Mascot4;
        }
        case 4: {
            return Mascot5;
        }
        case 5: {
            return Mascot6;
        }
        case 6: {
            return Mascot7;
        }
        case 7: {
            return Mascot8;
        }
        case 8: {
            return Mascot9;
        }
        case 9: {
            return Mascot10;
        }
        case 10: {
            return Mascot11;
        }
        case 11: {
            return Mascot12;
        }
        case 12: {
            return Mascot13;
        }
        case 13: {
            return Mascot14;
        }
        case 14: {
            return Mascot15;
        }
        case 15: {
            return Mascot16;
        }
        case 16: {
            return Mascot17;
        }
        case 17: {
            return Mascot18;
        }
        case 18: {
            return Mascot19;
        }
        case 19: {
            return Mascot20;
        }
        case 20: {
            return Mascot21;
        }
        case 21: {
            return Mascot22;
        }
        case 22: {
            return Mascot23;
        }
        case 23: {
            return Mascot24;
        }
        default:
            alert("The mascot images cannot be loaded. Please contact your teacher!");
    }
}