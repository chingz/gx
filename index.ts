import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from './webpack.config';

const PORT = 3000;
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

// tslint:disable-next-line:no-console
app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));

