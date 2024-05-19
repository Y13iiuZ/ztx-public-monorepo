#!/usr/bin/env node
console.log('*****************Starting ztx-cli*****************');

const {Command, program} = require('commander');

const fse = require('fs-extra')
const path = require('path')

program
    .version('1.0.0')
    .description('ztx-cli')
    .command("create")
    .description('pack entry')
    .action((entry, options) => {
        console.log('我开始拷贝文件到', process.cwd());
        fse.copy(path.resolve(__dirname, '../template'), process.cwd(), (err) => {
            console.log('copy success',err);
        })
    })

// program
//     .version('1.0.0')
//     .description('ztx-cli')
//     .command("pack [entry]")
//     .description('pack entry')
//     .option('-d --dev','开发环境')
//     .option('-p --prod', '生产环境')
//     .action((entry, options) => {
//         console.log('pack', entry, JSON.stringify(options));
//     })

program.parse(process.argv)