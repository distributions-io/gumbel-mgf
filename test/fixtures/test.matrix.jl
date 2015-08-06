using Distributions
using JSON

mu = 0
beta = 0.8
d = Gumbel( mu,beta )

x = linspace( 0, 25, 50 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("mu", mu),
	("beta", beta),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/matrix.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
