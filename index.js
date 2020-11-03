const axiosBase = require('axios');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.functionMain = async (req, res) => {
    
    await this.notifyLine(req);
    res.status(200).send(req.body);
  };

exports.notifyLine = async (req) => {
    const {mainMessage, from} = req.body
    try{
        const lineToken = process.env.LINE_TOKEN
        const axios = axiosBase.create({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${lineToken}`
          }
        });
        const params = new URLSearchParams();
        const fromMessage = from ? ` (from: ${from})` : '';
        params.append('message', `${mainMessage}${fromMessage}`);
        const response = await axios.post('https://notify-api.line.me/api/notify', params)
        console.log('request success: ', response.data)

    }catch(error){
        console.log('request error: ', error.response.data)
    }
}
