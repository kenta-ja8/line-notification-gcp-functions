const { notifyLine } = require('./index');

const localTest = async ()=>{
    const exampleReqest = {
        body: {
          mainMessage: 'Don’t forget to Put Out your Trash',
          from: 'local-test'
        }
    }
    const response = await notifyLine(exampleReqest);
}
localTest();
