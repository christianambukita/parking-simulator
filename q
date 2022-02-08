[33mcommit 09e43f6b15c5721e0c1dce1166a8aaeaf473e437[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m)[m
Author: Christian Ambukita <christianambukita@gmail.com>
Date:   Tue Feb 8 18:20:38 2022 +0100

    Change units from px to em

[1mdiff --git a/src/css/App.css b/src/css/App.css[m
[1mindex ef74266..dd2b258 100644[m
[1m--- a/src/css/App.css[m
[1m+++ b/src/css/App.css[m
[36m@@ -6,6 +6,7 @@[m [mbody {[m
 	--target-color: hsla(45, 90%, 50%, 0.8);[m
 	--target-color-blink: hsla(45, 90%, 50%, 0.1);[m
 	background: var(--color2);[m
[32m+[m	[32mfont-size: 1px !important;[m
 }[m
 [m
 .flex-container {[m
[1mdiff --git a/src/css/Car.css b/src/css/Car.css[m
[1mindex 1bbfddc..814a799 100644[m
[1m--- a/src/css/Car.css[m
[1m+++ b/src/css/Car.css[m
[36m@@ -4,10 +4,10 @@[m [mbody {[m
 }[m
 [m
 .car {[m
[31m-	--body-width: 100px;[m
[31m-	--body-height: 200px;[m
[31m-	--rear-axis: 40px;[m
[31m-	--wheel-height: 50px;[m
[32m+[m	[32m--body-width: 100em;[m
[32m+[m	[32m--body-height: 200em;[m
[32m+[m	[32m--rear-axis: 40em;[m
[32m+[m	[32m--wheel-height: 50em;[m
 	position: absolute;[m
 	top: 0;[m
 	left: 0;[m
[36m@@ -31,38 +31,38 @@[m [mbody {[m
 	height: var(--body-height);[m
 	border-top-left-radius: 30%;[m
 	border-top-right-radius: 30%;[m
[31m-	border-bottom-left-radius: 20px;[m
[31m-	border-bottom-right-radius: 20px;[m
[32m+[m	[32mborder-bottom-left-radius: 20em;[m
[32m+[m	[32mborder-bottom-right-radius: 20em;[m
 	position: absolute;[m
 }[m
 [m
 .wheel {[m
 	background: var(--wheel-color);[m
[31m-	width: 20px;[m
[32m+[m	[32mwidth: 20em;[m
 	height: var(--wheel-height);[m
[31m-	border-radius: 5px;[m
[32m+[m	[32mborder-radius: 5em;[m
 	position: absolute;[m
 	transform-origin: 50% 50%;[m
 }[m
 [m
 .w-front {[m
[31m-	top: 35px;[m
[32m+[m	[32mtop: 35em;[m
 	transform: rotate(var(--wheel-angle));[m
 }[m
 .w-back {[m
 	bottom: calc(var(--wheel-height) - var(--rear-axis));[m
 }[m
 .w-left {[m
[31m-	left: -10px;[m
[32m+[m	[32mleft: -10em;[m
 }[m
 .w-right {[m
[31m-	right: -10px;[m
[32m+[m	[32mright: -10em;[m
 }[m
 [m
 /* testing */[m
 .point {[m
[31m-	width: 1px;[m
[31m-	height: 1px;[m
[32m+[m	[32mwidth: 1em;[m
[32m+[m	[32mheight: 1em;[m
 	background: #fff;[m
 	position: absolute;[m
 }[m
[1mdiff --git a/src/css/DummyCar.css b/src/css/DummyCar.css[m
[1mindex ac26f2d..3136e1d 100644[m
[1m--- a/src/css/DummyCar.css[m
[1m+++ b/src/css/DummyCar.css[m
[36m@@ -1,7 +1,7 @@[m
 .dummy-car-container {[m
 	position: absolute;[m
[31m-	width: 120px;[m
[31m-	height: 200px;[m
[32m+[m	[32mwidth: 120em;[m
[32m+[m	[32mheight: 200em;[m
 	top: 0;[m
 	left: 0;[m
 }[m
[36m@@ -22,26 +22,26 @@[m
 	--c0: hsl(0, 0%, 90%);[m
 [m
 	background: var(--c9);[m
[31m-	width: 100px;[m
[31m-	height: 200px;[m
[32m+[m	[32mwidth: 100em;[m
[32m+[m	[32mheight: 200em;[m
 	border-top-left-radius: 30%;[m
 	border-top-right-radius: 30%;[m
[31m-	border-bottom-left-radius: 20px;[m
[31m-	border-bottom-right-radius: 20px;[m
[32m+[m	[32mborder-bottom-left-radius: 20em;[m
[32m+[m	[32mborder-bottom-right-radius: 20em;[m
 }[m
 [m
 .dummy-car-wheels {[m
 	background: var(--wheel-color);[m
[31m-	width: 120px;[m
[31m-	height: 50px;[m
[31m-	border-radius: 5px;[m
[32m+[m	[32mwidth: 120em;[m
[32m+[m	[32mheight: 50em;[m
[32m+[m	[32mborder-radius: 5em;[m
 	position: absolute;[m
 }[m
 [m
 .d-c-top {[m
[31m-	top: 35px;[m
[32m+[m	[32mtop: 35em;[m
 }[m
 [m
 .d-c-bottom {[m
[31m-	bottom: 15px;[m
[32m+[m	[32mbottom: 15em;[m
 }[m
[1mdiff --git a/src/css/Instruction.css b/src/css/Instruction.css[m
[1mindex 4df3e0b..448c60d 100644[m
[1m--- a/src/css/Instruction.css[m
[1m+++ b/src/css/Instruction.css[m
[36m@@ -1,28 +1,28 @@[m
 .instruction-container {[m
 	position: absolute;[m
[31m-	right: 20px;[m
[31m-	top: 380px;[m
[32m+[m	[32mright: 20em;[m
[32m+[m	[32mtop: 380em;[m
 	color: var(--road-line);[m
[31m-	font-size: 3em;[m
 	flex-direction: column;[m
 }[m
 [m
 /* keys */[m
[31m-@media (max-width: 700px) {[m
[32m+[m[32m@media (max-width: 700em) {[m
 }[m
 [m
 .i-text-big {[m
 	margin: 0;[m
 	padding: 0;[m
[31m-	font-size: 1.75em;[m
[31m-	margin-right: 20px;[m
[32m+[m	[32mfont-size: 85em;[m
[32m+[m	[32mmargin-right: 0.25em;[m
[32m+[m	[32mmargin-bottom: -0.5em;[m
 }[m
 .i-text {[m
 	margin: 0;[m
 	padding: 0;[m
 	font-weight: 600;[m
[31m-	font-size: 0.8em;[m
[32m+[m	[32mfont-size: 39em;[m
 }[m
 .i-top {[m
[31m-	margin-bottom: -30px;[m
[32m+[m	[32mmargin-bottom: -1em;[m
 }[m
[1mdiff --git a/src/css/Keyboard.css b/src/css/Keyboard.css[m
[1mindex 29c607f..3614f63 100644[m
[1m--- a/src/css/Keyboard.css[m
[1m+++ b/src/css/Keyboard.css[m
[36m@@ -7,5 +7,5 @@[m
 }[m
 [m
 #keyboard .keys {[m
[31m-	font-size: 1.5em;[m
[32m+[m	[32mfont-size: 24em;[m
 }[m
[1mdiff --git a/src/css/ParkingSlots.css b/src/css/ParkingSlots.css[m
[1mindex dc96804..260db78 100644[m
[1m--- a/src/css/ParkingSlots.css[m
[1m+++ b/src/css/ParkingSlots.css[m
[36m@@ -1,6 +1,6 @@[m
 .parking-slots {[m
[31m-	height: 800px;[m
[31m-	width: 1000px;[m
[32m+[m	[32mheight: 800em;[m
[32m+[m	[32mwidth: 1000em;[m
 [m
 	background: var(--ground-1);[m
 	flex-direction: column;[m
[36m@@ -9,8 +9,8 @@[m
 	border-block: var(--slot-line-width) solid var(--road-line);[m
 [m
 	/* position: absolute; */[m
[31m-	margin-bottom: 50px;[m
[31m-	margin-right: 50px;[m
[32m+[m	[32mmargin-bottom: 50em;[m
[32m+[m	[32mmargin-right: 50em;[m
 	left: 0;[m
 	top: 0;[m
 }[m
[36m@@ -19,7 +19,7 @@[m
 	justify-content: space-between;[m
 }[m
 .slot-line {[m
[31m-	border-radius: 3px;[m
[32m+[m	[32mborder-radius: 3em;[m
 	width: var(--slot-line-width);[m
 	height: var(--slot-height);[m
 	background: var(--road-line);[m
[36m@@ -28,7 +28,7 @@[m
 .endline {[m
 	width: 100%;[m
 	background: var(--road-line);[m
[31m-	height: 20px;[m
[32m+[m	[32mheight: 20em;[m
 	position: absolute;[m
 }[m
 [m
[36m@@ -43,16 +43,18 @@[m
 [m
 .target {[m
 	box-sizing: border-box;[m
[31m-	--shadow-thickness: 15px;[m
[32m+[m	[32m--shadow-thickness: 15em;[m
 	content: 'PARK HERE';[m
[31m-	border: 10px solid transparent;[m
[32m+[m	[32mborder: 10em solid transparent;[m
 	color: var(--target-color);[m
 	animation: target-blink 2s ease-in-out infinite;[m
 	box-shadow: inset 0 0 0 var(--shadow-thickness) var(--target-color);[m
 	align-items: flex-start;[m
[31m-	font-size: 1.8em;[m
 	font-weight: 700;[m
 }[m
[32m+[m[32m.target p {[m
[32m+[m	[32mfont-size: 29em;[m
[32m+[m[32m}[m
 [m
 .bottom {[m
 	align-items: flex-end;[m
[36m@@ -75,5 +77,5 @@[m
 [m
 .parked {[m
 	box-sizing: border-box;[m
[31m-	border: 20px solid hsla(100, 50%, 50%, 0.5);[m
[32m+[m	[32mborder: 20em solid hsla(100, 50%, 50%, 0.5);[m
 }[m
[1mdiff --git a/src/css/Scene.css b/src/css/Scene.css[m
[1mindex 80220b6..4ad3d6b 100644[m
[1m--- a/src/css/Scene.css[m
[1m+++ b/src/css/Scene.css[m
[36m@@ -6,10 +6,10 @@[m
 }[m
 [m
 .scene {[m
[31m-	--parking-width: 1000px;[m
[31m-	--parking-height: 800px;[m
[31m-	--slot-line-width: 20px;[m
[31m-	--slot-height: 240px;[m
[32m+[m	[32m--parking-width: 1000em;[m
[32m+[m	[32m--parking-height: 800em;[m
[32m+[m	[32m--slot-line-width: 20em;[m
[32m+[m	[32m--slot-height: 240em;[m
 	--slots-count: 5;[m
 	--slot-width: calc([m
 		(var(--parking-width) - var(--slot-line-width)) / var(--slots-count) -[m
[1mdiff --git a/src/css/TopBar.css b/src/css/TopBar.css[m
[1mindex 75f68c3..5ac5ef8 100644[m
[1m--- a/src/css/TopBar.css[m
[1m+++ b/src/css/TopBar.css[m
[36m@@ -1,11 +1,11 @@[m
 body {[m
 	/* Make sure to update display height variable in Dummy Car component and ParkingSlots component*/[m
[31m-	--display-height: 150px;[m
[32m+[m	[32m--display-height: 150em;[m
 }[m
 .top-bar {[m
 	height: var(--display-height);[m
 	position: absolute;[m
[31m-	top: calc(0px - var(--display-height));[m
[32m+[m	[32mtop: calc(0em - var(--display-height));[m
 	color: var(--road-line);[m
 	width: 100%;[m
 	display: flex;[m
[36m@@ -14,25 +14,28 @@[m [mbody {[m
 }[m
 .score-display {[m
 	font-weight: 400;[m
[31m-	font-size: 5em;[m
[32m+[m	[32mfont-size: 80em;[m
 	margin: 0;[m
[31m-	padding-inline: 20px;[m
[32m+[m	[32mpadding-inline: 0.5em;[m
 }[m
 [m
 .top-bar button {[m
[32m+[m	[32mfont-size: 1px;[m
 	display: flex;[m
 	flex-direction: column;[m
 	align-items: center;[m
 	background: var(--ground-1);[m
 	color: white;[m
[31m-	border: 15px solid var(--road-line);[m
[31m-	border-radius: 5px;[m
[32m+[m	[32mborder: 15em solid var(--road-line);[m
[32m+[m	[32mborder-radius: 5em;[m
[32m+[m	[32mwidth: 215em;[m
[32m+[m[32m}[m
[32m+[m[32m.top-bar button span {[m
 	font-weight: 500;[m
[31m-	width: 215px;[m
[31m-	font-size: 1.8em;[m
[32m+[m	[32mfont-size: 29em;[m
 }[m
 [m
 .top-bar button:hover {[m
 	color: var(--target-color);[m
[31m-	border: 15px solid var(--target-color);[m
[32m+[m	[32mborder: 15em solid var(--target-color);[m
 }[m
[1mdiff --git a/src/css/keys.css b/src/css/keys.css[m
[1mindex b315b23..8b2e8f3 100644[m
[1m--- a/src/css/keys.css[m
[1m+++ b/src/css/keys.css[m
[36m@@ -1,5 +1,5 @@[m
 .keys {[m
[31m-	font-size: 6px;[m
[32m+[m	[32mfont-size: 6em;[m
 	width: 30em;[m
 	height: 20em;[m
 	display: grid;[m
[36m@@ -7,7 +7,7 @@[m
 	grid-template-areas:[m
 		'. key1 .'[m
 		'key4 key3 key2';[m
[31m-	margin-bottom: 30px;[m
[32m+[m	[32mmargin-bottom: 0em;[m
 }[m
 [m
 .key {[m
