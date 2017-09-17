# MindMap_JS_JQuery
Réalisation dans le cadre d'un examen de la Code&amp;Go, d'un mini mindmap en JavaScript, JQuery 

Index.php : entrée de l'application, inclut un textinput afin de nommer le Mindmap.
script.js : démarre le pluggin JQuery contenant le Mindmap
mindmpa.js : point d'entrée du pluggin, intègre les scripts utiles, instancie le noeud principal.
Nodes.js : Class gérant les différents noeuds et leurs interactions.
Node.js : class gérant un noeud.
Canvas.js : gestion des liens fléchés entre les noeuds, calcul de positions et mise à jour en temps réel des flèches.
Drag.js : prends en charge le drag and drop de l'élement fourni au contructeur. Clone l'objet transmis afin de ne voir que l'élément
en cours de drag, et faire disparaître la semi transparence imposée par HTML5.

nb : testé sur Chrome 50+

