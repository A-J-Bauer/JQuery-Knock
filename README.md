# JQuery-Knock
A jQuery plugin for detecting a user knock code / beat.

# Example:
```
$('#canvas').knock({
	onRecognized: function () {
		alert('beat sequence recognized');
	},
	beat: [400, 200, 200, 400, 800, 400],
	restart: 3000
});
```

# Options
```
 beat: the beat sequence to detect.
 debug: true/false, option to output a beat sequence to the console
 restart: the idle time after which to start sequence recognition again
 events: the events to listen for (keydown, mousedown, touchstart, pointerdown)
```
# License MIT
