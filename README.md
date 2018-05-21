# Next Boat

Turns a dusty old Kindle into an e-ink information screen displaying the next
Thames Clipper boat.

## Steps

### Install prerequisites

You'll need a reasonably recent version of Ruby and Bundler.

    $ bundle

### Start a server:

    $ STOP_POINT=930GGLP bundle exec ruby server.rb

This will give you times for Greenland Pier. For anywhere else, refer to the
[StopPoint Search on the TfL API](https://api.tfl.gov.uk/swagger/ui/index.html?url=/swagger/docs/v1#!/StopPoint/StopPoint_Search)

### Turn off the Kindle screensaver:

You need only do this once.

1. Press the home button
2. Press the keyboard button
3. Type `;debugOn` followed by `↵`
4. Repeat 1 & 2; type `~disableScreensaver` followed by `↵`
5. Repeat 1 & 2; type `;debugOff` followed by `↵`

### Open the browser

1. Press the menu button
2. Select _Experimental_
3. Select _launch browser_
4. Choose any bookmark, then enter the address of your server, e.g.
   `http://192.168.1.10:4567/`
