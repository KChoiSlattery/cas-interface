from latex2sympy.latex2sympy import process_sympy
from sympy import srepr

# print(process_sympy("\\exp(ab)"))
# print(srepr(process_sympy("\\exp(ab)")))
# print(process_sympy("\\exp(ab)\\theta \\beta \\zeta \\delta").free_symbols)

# print(process_sympy("v^2=\\mu \\left(\\frac{2}{r}-\\frac{1}{a}\\right)"))
print(srepr(process_sympy("v^2=\\mu \\left(\\frac{2}{r}-\\frac{1}{a}\\right)")))
# print(process_sympy("v^2=\\mu \\left(\\frac{2}{r}-\\frac{1}{a}\\right)").free_symbols)

# print(process_sympy("\\sin(a+bc)+"))