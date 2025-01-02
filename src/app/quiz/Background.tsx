import React from "react";
import "./background.css"; // Import your background-specific CSS

const Background: React.FC = () => {
  const backgroundHTML = `
   <!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>KBC LOGO (CSSonly)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Audiowide'>
</head>
<body>
<!-- partial:index.partial.html -->
<div class="logo">
  <div class="rings">
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="ring">
      <div class="rin"></div>
    </div>
    <div class="border"></div>
    <div class="rs">&#8377;</div>
    <div class="rs">&#8377;</div>
    <div class="rs">&#8377;</div>
    <div class="rs">&#8377;</div>
    <div class="rs">&#8377;</div>
    <div class="rs">&#8377;</div>
  </div>
  <div class="diamond"></div>
  <div class="diamond"></div>
  <div class="diamond"></div>
  <div class="diamond"></div>
  <div class="mainHeading">CODER</div>
  <div class="subHeading1">
    <div class="char">K</div>
    <div class="char">A</div>
    <div class="char">U</div>
    <div class="char">N</div>
    <div class="char">&nbsp;</div>
    <div class="char">B</div>
    <div class="char">A</div>
    <div class="char">N</div>
    <div class="char">E</div>
    <div class="char">G</div>
    <div class="char">A</div>
  </div>
  <div class="subHeading2">
    <div class="char">K</div>
    <div class="char">A</div>
    <div class="char">U</div>
    <div class="char">N</div>
    <div class="char">&nbsp;</div>
    <div class="char">B</div>
    <div class="char">A</div>
    <div class="char">N</div>
    <div class="char">E</div>
    <div class="char">G</div>
    <div class="char">A</div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>

  `;

  return (
    <div
      className="background-container"
      dangerouslySetInnerHTML={{ __html: backgroundHTML }}
    />
  );
};

export default Background;
