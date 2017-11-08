/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 1 Nov 2017
 * Description:
 */
import * as fs from 'fs';
import * as path from 'path';
import colorSpace from 'color-space';
import stringHash from 'string-hash';
import * as marked from 'marked';
import katex from 'parse-katex';
import * as highlighter from 'highlight.js';

import {TThemeConfig, TCDCMode} from './types';
import config from './config';

export const getDirectories = (dirPath: string) => {
  return fs.readdirSync(dirPath).filter(file =>
    fs.statSync(path.join(dirPath, file)).isDirectory()
      && file.substr(0, 1) !== '.'
  );
};

export const getFiles = (dirPath: string) => {
  return fs.readdirSync(dirPath).filter(file =>
    fs.statSync(path.join(dirPath, file)).isFile()
      && file.replace(/^.*\./, '') === 'md'
  ).map(file => file.replace('.md', ''));
};

export const getNameFromPath = (p: string) => {
  return p.replace(/^.*[\\\/]/, '');
};

export const stringToColor = (
  str: string,
  constraints: [number, number, number] |
    [number, number, number, TCDCMode] |
    [number, number, number, [number, number]] |
    [number, number, number, TCDCMode, [number, number]],
  config: TThemeConfig
) => {
  let mode = config.get('CDCMode', 'hue');
  let cdc = config.get('CDCRange', null).toJS();
  const c1 = constraints[0];
  const c2 = constraints[1];
  const alpha = constraints[2];
  if (constraints[3] !== undefined) {
    if (typeof constraints[3] === 'string') {
      mode = <TCDCMode>constraints[3];
    } else {
      cdc = <[number, number]>constraints[3];
    }
  }
  if (constraints[4] !== undefined) {
    cdc = <[number, number]>constraints[4];
  }
  const cdcRange = cdc[1] - cdc[0];
  const cdcStart = cdc[0];
  const d = Math.round(stringHash(str) % cdcRange) + cdcStart;
  let color;
  if (mode === 'hue') {
    color = colorSpace.hsl.rgb([d, c1, c2]).map(num => parseInt(num, 10));
  } else if (mode === 'saturation') {
    color = colorSpace.hsl.rgb([c1, d, c2]).map(num => parseInt(num, 10));
  } else if (mode === 'lightness') {
    color = colorSpace.hsl.rgb([c1, c2, d]).map(num => parseInt(num, 10));
  }
  color.push(alpha);
  return 'rgba(' + color.join(',') + ')';
}

const renderer = new marked.Renderer();
const highlight = (code: string) => {
  const re = /:::(\S+)\n([\s\S]+)/.exec(code);
  let lang = config.defaultHighlight;
  let content = code;

  if (re) {
    lang = re[1];
    content = re[2];
  }

  let result = '';
  try {
    result = highlighter.highlight(lang, content).value;
  } catch (e) {
    result = highlighter.highlight(config.defaultHighlight, content).value;
  }

  return result;
};

const options = {
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: highlight
};

export const parse = (page: string) => {
  const html = marked.parse(page, options);
  return katex.renderLaTeX(html);
};
