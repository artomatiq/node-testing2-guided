test('environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})