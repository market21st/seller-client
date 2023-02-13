import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
*{ font-family: 'Spoqa Han Sans','Sans-serif'; }
body {
	line-height: 1;
	
}
div{
	font-weight: 500;
}
h3{
	font-weight: 500;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button{ background: none; cursor: pointer;}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
  border: none;
  outline: none;
}

a {color: #4552CE; text-decoration: none; outline: none}
a:hover, a:active {text-decoration: none;}

.postmodal{
    background : rgba(0,0,0,0.25);
    position : fixed;
    left:0;
    top:0;
    height:100%;
    width:100%;
}
& .MuiMenu-root {
    height: 34vh !important;
	right:auto !important;
	width: 100%;
  }

`;

export default GlobalStyles;
