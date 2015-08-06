using Distributions
using JSON

mu = 2
beta = 4
d = Gumbel( mu,beta )

x = linspace( -100, 100, 400 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("mu", mu),
	("beta", beta),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/accessor.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
