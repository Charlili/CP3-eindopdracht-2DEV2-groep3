# Awesome CP-Examen Boilerplate

## Getting Started with Thib's magic auto installer
* Dubbelklik op Gulp.command en geef je paswoord in terminal.
* BOOM DONE, ALLES GEINSTALLEERD EN AAN HET WATCHEN
* *(Not working? Check Fixes below)*

## Getting Started Manually
* Terminal jezelf in de map met gulpfile.js en package.json
* Run `npm install` om de dependencies op te halen uit `package.json` en te
downloaden van npmjs.org
* Als alle dependencies in node_modules zitten kan je zelf nog stuff toevoegen
met `npm install --save-dev je-gulp-plugin`
* Run `gulp watch` om te starten met scss conversion, js hinting, minifying en sourcemaps.

### Basic stuff explained in deze gulpfile.js
1. Requires: alles requiren voor gulp
2. Stylesheet tasks: Source stellen voor `.scss` files en pipen naar compass settings zodat je `config.rb` niet zelf hoeft te definen.
Beepen bij een error en de destination voor Sass files stellen naar `css` map
3. Linting / Hinting: Source stellen voor `.js` files en ze pipen naar jshint en stylish opmaken in je terminal om errors in je js te tonen.
4. Script tasks: Eerst lint task aanroepen en dan pas scripts beginnen. Met browserify al je Classes samen concatineren naar 1 file. Terminal beepen als je een error maakt.
Bij no errors wordt de file van browserify gepiped naar een nieuwe source file `script.dist.js`
Niet alle plugins kunnen gestreamed worden, that's why gulp-buffer.
Sourcemaps genereren voor je js files. Minifyen ter optimalisatie en alles pipen naar de js map
5. Gulp watch: eerst script en styles uitvoeren, dan alles gaan watchen en je kan aan de slag!

#### Not working? Fixes:
* Check of je een `.jshintrc` file hebt staan in de root van je project (dus bij gulpfile en package).
* Check of je `package.json` devDependencies overeen komen met je node_modules.
* Check of je geen fouten hebt gemaakt in je gulpfile.js
* Kan je Gulp.command niet runnen? Doe da in terminal `chmod +x Gulp.command` en het zal werken
