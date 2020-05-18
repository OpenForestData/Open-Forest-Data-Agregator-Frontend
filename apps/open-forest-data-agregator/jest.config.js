module.exports = {
  name: 'open-forest-data-agregator',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/open-forest-data-agregator/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
