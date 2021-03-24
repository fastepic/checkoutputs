// How use ?
// node checkoutputs password fullpathtowalletexe whatsearch
//

const { spawn} = require('child_process')

var arg = []
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(index>1) arg.push(val);
});


let walletfast = spawn('epic-wallet', ['--pass',arg[0], '-d', arg[1],  '-s', 'outputs' ], {cwd:arg[1]})

let searchstring = ""

walletfast.stdout.on('data', (data) => {
   
   searchstring += data	
   console.log(` walletfast stdout: ${data}`)
                        
});

walletfast.stderr.on('data', (data) => {
      console.log(` walletfast stderr: ${data}`)
});

walletfast.on('close', (code) => {

	if(code==0){

		if(searchstring.search(arg[2])>-1) console.log("Found "+arg[2]); else console.log("Not found "+arg[2]);
	}                            
                            
}); 
